import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  joinProject: (projectId: string) => void;
  leaveProject: (projectId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  joinProject: () => {},
  leaveProject: () => {},
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (user) {
      // Initialize socket connection when user is authenticated
      const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
      
      socketRef.current = io(serverUrl, {
        auth: {
          token: localStorage.getItem('token'),
        },
        autoConnect: true,
      });

      const socket = socketRef.current;

      socket.on('connect', () => {
        console.log('🔌 Connected to server');
      });

      socket.on('disconnect', () => {
        console.log('🔌 Disconnected from server');
      });

      socket.on('connect_error', (error) => {
        console.error('🔌 Connection error:', error);
      });

      // Global socket event listeners
      socket.on('user-joined', (data) => {
        console.log('👤 User joined:', data.user.username);
      });

      socket.on('user-left', (data) => {
        console.log('👤 User left:', data.user.username);
      });

      socket.on('chat-message-broadcast', (data) => {
        // Handle chat messages globally or delegate to specific components
        console.log('💬 Chat message:', data);
      });

      socket.on('code-changed', (data) => {
        // Handle real-time code changes
        console.log('📝 Code changed:', data.filePath);
      });

      socket.on('file-created-broadcast', (data) => {
        console.log('📁 File created:', data.filePath);
      });

      socket.on('file-deleted-broadcast', (data) => {
        console.log('🗑️ File deleted:', data.filePath);
      });

      socket.on('ai-generation-started', (data) => {
        console.log('🤖 AI generation started:', data.type);
      });

      socket.on('ai-generation-completed', (data) => {
        console.log('🤖 AI generation completed:', data.type);
      });

    } else if (socketRef.current) {
      // Disconnect socket when user logs out
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  const joinProject = (projectId: string) => {
    if (socketRef.current && user) {
      socketRef.current.emit('join-project', {
        projectId,
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
      });
    }
  };

  const leaveProject = (projectId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('leave-project', projectId);
    }
  };

  const value: SocketContextType = {
    socket: socketRef.current,
    joinProject,
    leaveProject,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};