import { Request, Response } from 'express';
import { IUser } from '../models/User';
import { validateAIGeneration } from '../utils/validation';
import { AIService } from '../services/aiService';

interface AuthRequest extends Request {
  user?: IUser;
}

const aiService = new AIService();

export const generateComponent = async (req: AuthRequest, res: Response) => {
  const { error } = validateAIGeneration(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const user = req.user!;
  
  // Check if user has enough credits
  if (user.credits < 1) {
    return res.status(402).json({ 
      error: { message: 'Insufficient credits. Please upgrade your plan.' } 
    });
  }

  try {
    const { prompt, framework = 'react', style = 'tailwind', complexity = 'medium' } = req.body;
    
    const generatedCode = await aiService.generateComponent({
      prompt,
      framework,
      style,
      complexity
    });

    // Deduct credits (in a real app, you'd update the user's credits)
    // user.credits -= 1;
    // await user.save();

    res.json({
      success: true,
      code: generatedCode,
      creditsRemaining: user.credits - 1
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to generate component. Please try again.' } 
    });
  }
};

export const generatePage = async (req: AuthRequest, res: Response) => {
  const { error } = validateAIGeneration(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const user = req.user!;
  
  if (user.credits < 3) {
    return res.status(402).json({ 
      error: { message: 'Insufficient credits. Page generation requires 3 credits.' } 
    });
  }

  try {
    const { prompt, framework = 'react', style = 'tailwind', complexity = 'medium' } = req.body;
    
    const generatedCode = await aiService.generatePage({
      prompt,
      framework,
      style,
      complexity
    });

    res.json({
      success: true,
      code: generatedCode,
      creditsRemaining: user.credits - 3
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to generate page. Please try again.' } 
    });
  }
};

export const generateApp = async (req: AuthRequest, res: Response) => {
  const { error } = validateAIGeneration(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const user = req.user!;
  
  if (user.credits < 10) {
    return res.status(402).json({ 
      error: { message: 'Insufficient credits. App generation requires 10 credits.' } 
    });
  }

  try {
    const { prompt, framework = 'react', style = 'tailwind', complexity = 'medium' } = req.body;
    
    const generatedFiles = await aiService.generateApp({
      prompt,
      framework,
      style,
      complexity
    });

    res.json({
      success: true,
      files: generatedFiles,
      creditsRemaining: user.credits - 10
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to generate app. Please try again.' } 
    });
  }
};

export const improveCode = async (req: AuthRequest, res: Response) => {
  const { code, instructions } = req.body;
  
  if (!code || !instructions) {
    return res.status(400).json({ 
      error: { message: 'Code and improvement instructions are required' } 
    });
  }

  const user = req.user!;
  
  if (user.credits < 1) {
    return res.status(402).json({ 
      error: { message: 'Insufficient credits.' } 
    });
  }

  try {
    const improvedCode = await aiService.improveCode(code, instructions);

    res.json({
      success: true,
      improvedCode,
      creditsRemaining: user.credits - 1
    });
  } catch (error) {
    console.error('AI improvement error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to improve code. Please try again.' } 
    });
  }
};

export const explainCode = async (req: AuthRequest, res: Response) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      error: { message: 'Code is required' } 
    });
  }

  try {
    const explanation = await aiService.explainCode(code);

    res.json({
      success: true,
      explanation
    });
  } catch (error) {
    console.error('AI explanation error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to explain code. Please try again.' } 
    });
  }
};

export const debugCode = async (req: AuthRequest, res: Response) => {
  const { code, error: codeError } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      error: { message: 'Code is required' } 
    });
  }

  const user = req.user!;
  
  if (user.credits < 1) {
    return res.status(402).json({ 
      error: { message: 'Insufficient credits.' } 
    });
  }

  try {
    const debugInfo = await aiService.debugCode(code, codeError);

    res.json({
      success: true,
      debugInfo,
      creditsRemaining: user.credits - 1
    });
  } catch (error) {
    console.error('AI debug error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to debug code. Please try again.' } 
    });
  }
};

export const suggestImprovements = async (req: AuthRequest, res: Response) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      error: { message: 'Code is required' } 
    });
  }

  try {
    const suggestions = await aiService.suggestImprovements(code);

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('AI suggestions error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to generate suggestions. Please try again.' } 
    });
  }
};