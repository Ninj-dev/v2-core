import { Server, Socket } from 'socket.io';

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface RoomData {
  projectId: string;
  users: Map<string, User>;
  cursors: Map<string, { x: number; y: number; file: string }>;
}

const rooms = new Map<string, RoomData>();

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Join project room for real-time collaboration
    socket.on('join-project', (data: { projectId: string; user: User }) => {
      const { projectId, user } = data;
      
      socket.join(projectId);
      
      if (!rooms.has(projectId)) {
        rooms.set(projectId, {
          projectId,
          users: new Map(),
          cursors: new Map()
        });
      }

      const room = rooms.get(projectId)!;
      room.users.set(socket.id, user);

      // Notify other users in the room
      socket.to(projectId).emit('user-joined', {
        user,
        socketId: socket.id,
        users: Array.from(room.users.values())
      });

      // Send current users to the new user
      socket.emit('room-users', Array.from(room.users.values()));
      
      console.log(`👥 User ${user.username} joined project ${projectId}`);
    });

    // Leave project room
    socket.on('leave-project', (projectId: string) => {
      socket.leave(projectId);
      
      const room = rooms.get(projectId);
      if (room) {
        const user = room.users.get(socket.id);
        room.users.delete(socket.id);
        room.cursors.delete(socket.id);

        if (user) {
          socket.to(projectId).emit('user-left', {
            user,
            socketId: socket.id,
            users: Array.from(room.users.values())
          });
        }

        // Clean up empty rooms
        if (room.users.size === 0) {
          rooms.delete(projectId);
        }
      }
    });

    // Real-time code editing
    socket.on('code-change', (data: {
      projectId: string;
      filePath: string;
      content: string;
      cursor: { line: number; column: number };
    }) => {
      const { projectId, filePath, content, cursor } = data;
      
      // Broadcast to other users in the same project
      socket.to(projectId).emit('code-changed', {
        filePath,
        content,
        cursor,
        userId: socket.id
      });
    });

    // Cursor position updates
    socket.on('cursor-move', (data: {
      projectId: string;
      filePath: string;
      cursor: { line: number; column: number };
    }) => {
      const { projectId, filePath, cursor } = data;
      
      const room = rooms.get(projectId);
      if (room) {
        room.cursors.set(socket.id, { 
          x: cursor.column, 
          y: cursor.line, 
          file: filePath 
        });

        socket.to(projectId).emit('cursor-moved', {
          userId: socket.id,
          cursor,
          filePath
        });
      }
    });

    // File operations
    socket.on('file-created', (data: {
      projectId: string;
      filePath: string;
      content: string;
    }) => {
      socket.to(data.projectId).emit('file-created-broadcast', data);
    });

    socket.on('file-deleted', (data: {
      projectId: string;
      filePath: string;
    }) => {
      socket.to(data.projectId).emit('file-deleted-broadcast', data);
    });

    socket.on('file-renamed', (data: {
      projectId: string;
      oldPath: string;
      newPath: string;
    }) => {
      socket.to(data.projectId).emit('file-renamed-broadcast', data);
    });

    // Chat functionality
    socket.on('chat-message', (data: {
      projectId: string;
      message: string;
      user: User;
      timestamp: number;
    }) => {
      // Broadcast to all users in the project room
      io.to(data.projectId).emit('chat-message-broadcast', {
        ...data,
        socketId: socket.id
      });
    });

    // Voice/Video call signaling (for future implementation)
    socket.on('call-user', (data: {
      projectId: string;
      targetUserId: string;
      offer: any;
    }) => {
      socket.to(data.targetUserId).emit('incoming-call', {
        from: socket.id,
        offer: data.offer,
        projectId: data.projectId
      });
    });

    socket.on('answer-call', (data: {
      to: string;
      answer: any;
    }) => {
      socket.to(data.to).emit('call-answered', {
        answer: data.answer
      });
    });

    socket.on('ice-candidate', (data: {
      to: string;
      candidate: any;
    }) => {
      socket.to(data.to).emit('ice-candidate', {
        candidate: data.candidate
      });
    });

    // AI generation status
    socket.on('ai-generation-start', (data: {
      projectId: string;
      type: 'component' | 'page' | 'app';
      prompt: string;
    }) => {
      socket.to(data.projectId).emit('ai-generation-started', {
        userId: socket.id,
        ...data
      });
    });

    socket.on('ai-generation-complete', (data: {
      projectId: string;
      result: any;
    }) => {
      socket.to(data.projectId).emit('ai-generation-completed', {
        userId: socket.id,
        ...data
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
      
      // Clean up user from all rooms
      rooms.forEach((room, projectId) => {
        if (room.users.has(socket.id)) {
          const user = room.users.get(socket.id);
          room.users.delete(socket.id);
          room.cursors.delete(socket.id);

          if (user) {
            socket.to(projectId).emit('user-left', {
              user,
              socketId: socket.id,
              users: Array.from(room.users.values())
            });
          }

          // Clean up empty rooms
          if (room.users.size === 0) {
            rooms.delete(projectId);
          }
        }
      });
    });

    // Typing indicators
    socket.on('typing-start', (data: {
      projectId: string;
      filePath: string;
      user: User;
    }) => {
      socket.to(data.projectId).emit('user-typing', {
        userId: socket.id,
        ...data
      });
    });

    socket.on('typing-stop', (data: {
      projectId: string;
      filePath: string;
    }) => {
      socket.to(data.projectId).emit('user-stopped-typing', {
        userId: socket.id,
        ...data
      });
    });
  });

  // Periodic cleanup of inactive rooms
  setInterval(() => {
    const now = Date.now();
    rooms.forEach((room, projectId) => {
      if (room.users.size === 0) {
        rooms.delete(projectId);
        console.log(`🧹 Cleaned up empty room: ${projectId}`);
      }
    });
  }, 5 * 60 * 1000); // Clean up every 5 minutes
};