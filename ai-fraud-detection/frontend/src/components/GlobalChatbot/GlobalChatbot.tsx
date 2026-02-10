import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Fade,
  CircularProgress,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

type MessageRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

const GlobalChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Welcome to AI Banking! I\'m your intelligent assistant. I can help you with fraud detection insights, transaction analysis, risk assessment, and dashboard navigation. Try asking: "Show me recent fraud cases" or "What\'s the total transaction volume?"',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !messagesEndRef.current) return;

    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [open, messages]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response for demo purposes
      // In a real implementation, this would call your backend API
      setTimeout(() => {
        const responses = [
          'I can help you analyze transaction patterns and detect potential fraud.',
          'Based on the data, there are 24 flagged transactions requiring review.',
          'The total transaction volume this month is PKR 1,250,000.',
          'I\'ve identified 3 high-risk customer accounts that need attention.',
          'The fraud detection system has prevented losses of approximately PKR 45,600 this quarter.'
        ];
        
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: responses[Math.floor(Math.random() * responses.length)],
        };

        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <IconButton
        aria-label="Open AI chatbot"
        onClick={handleToggle}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1500,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #40e0ff 0%, #1e90ff 100%)',
          boxShadow: '0 8px 24px rgba(64, 224, 255, 0.6)',
          border: '1px solid rgba(64, 224, 255, 0.8)',
          color: '#0f2027',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e90ff 0%, #40e0ff 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(64, 224, 255, 0.8)',
          },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat Window */}
      <Fade in={open} unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            width: 360,
            maxWidth: '90vw',
            height: 420,
            zIndex: 1499,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
              border: '1px solid rgba(64, 224, 255, 0.4)',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                borderBottom: '1px solid rgba(64, 224, 255, 0.3)',
                background: 'rgba(10, 25, 41, 0.95)',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI Banking Assistant
              </Typography>
              <IconButton
                size="small"
                onClick={handleToggle}
                sx={{ color: '#b0b0b0', '&:hover': { color: '#ffffff' } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Messages */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    p: 1.2,
                    borderRadius: 2,
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(135deg, #40e0ff 0%, #1e90ff 100%)'
                        : 'rgba(10, 25, 41, 0.9)',
                    color: message.role === 'user' ? '#0f2027' : '#e0e0e0',
                    border:
                      message.role === 'user'
                        ? '1px solid rgba(64, 224, 255, 0.7)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow:
                      message.role === 'user'
                        ? '0 4px 12px rgba(64, 224, 255, 0.5)'
                        : '0 4px 12px rgba(0, 0, 0, 0.5)',
                    fontSize: 13,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {message.content}
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input */}
            <Box sx={{ p: 1.5, borderTop: '1px solid rgba(64, 224, 255, 0.3)' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about transactions, fraud, or dashboard features..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(15, 32, 39, 0.9)',
                    color: '#e0e0e0',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(64, 224, 255, 0.4)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(64, 224, 255, 0.7)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#40e0ff',
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      {loading ? (
                        <CircularProgress size={18} sx={{ color: '#40e0ff' }} />
                      ) : (
                        <IconButton
                          size="small"
                          onClick={handleSend}
                          sx={{ color: '#40e0ff' }}
                        >
                          <SendIcon fontSize="small" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Fade>
    </>
  );
};

export default GlobalChatbot;