-- Wayora To-Do List Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('Pre-Trip', 'On-Trip', 'After-Trip')),
  priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')),
  classification TEXT DEFAULT 'Misc',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Allow users to insert their own tasks
CREATE POLICY "Users can insert their own todos" 
ON todos FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to view only their own tasks
CREATE POLICY "Users can view their own todos" 
ON todos FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to update only their own tasks
CREATE POLICY "Users can update their own todos" 
ON todos FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow users to delete only their own tasks
CREATE POLICY "Users can delete their own todos" 
ON todos FOR DELETE 
USING (auth.uid() = user_id);
