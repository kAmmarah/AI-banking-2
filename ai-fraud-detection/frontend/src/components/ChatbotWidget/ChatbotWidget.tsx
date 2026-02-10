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
  Badge,
  Tooltip,
} from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat'; // Removed as it's not used since we switched to SmartToyIcon
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

type MessageRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hi! I am your AI fraud assistant. Ask me about suspicious transactions, risk scores, or how this dashboard works.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !messagesEndRef.current) return;

    // Keep chat scrolled to the latest message without moving the whole page
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [open, messages]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClearHistory = () => {
    // Reset to initial state but keep the welcome message
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Hi! I am your AI fraud assistant. Ask me about suspicious transactions, risk scores, or how this dashboard works.',
      },
    ]);
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply ?? 'I am here to help with fraud detection questions.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'Sorry, I could not reach the AI service right now. Please check that the backend server is running.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
    // Close chat with Escape key
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  // Keyboard shortcut for opening chat
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (open) {
      setUnreadCount(0);
    }
  }, [open]);

  return (
    <>
      <Tooltip title="AI Fraud Assistant" placement="left">
        <Badge
          badgeContent={unreadCount > 0 ? unreadCount : null}
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1500,
            '& .MuiBadge-badge': {
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(0.95)',
                  boxShadow: '0 0 0 0 rgba(64, 224, 255, 0.7)',
                },
                '70%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 10px rgba(64, 224, 255, 0)',
                },
                '100%': {
                  transform: 'scale(0.95)',
                  boxShadow: '0 0 0 0 rgba(64, 224, 255, 0)',
                },
              },
            },
          }}
        >
          <IconButton
            aria-label="Open AI chatbot"
            onClick={handleToggle}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #40e0ff 0%, #1e90ff 100%)',
              boxShadow: '0 8px 24px rgba(64, 224, 255, 0.6)',
              border: '2px solid rgba(64, 224, 255, 0.8)',
              color: '#0f2027',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'rotate 3s linear infinite',
                '@keyframes rotate': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              },
              '&:hover': {
                background: 'linear-gradient(135deg, #1e90ff 0%, #40e0ff 100%)',
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: '0 12px 35px rgba(64, 224, 255, 0.9)',
              },
              '& .MuiSvgIcon-root': {
                position: 'relative',
                zIndex: 1,
                fontSize: '28px',
              },
            }}
          >
            <SmartToyIcon />
          </IconButton>
        </Badge>
      </Tooltip>

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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SmartToyIcon sx={{ color: '#40e0ff', fontSize: '20px' }} />
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
                  AI Fraud Assistant
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(224, 224, 224, 0.7)',
                    fontStyle: 'italic'
                  }}
                >
                  Ctrl+/ to open
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleClearHistory}
                  sx={{
                    color: '#b0b0b0',
                    '&:hover': { color: '#ffffff' },
                    p: 0.5
                  }}
                  title="Clear chat history"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </IconButton>
              </Box>
              <IconButton
                size="small"
                onClick={handleToggle}
                sx={{ color: '#b0b0b0', '&:hover': { color: '#ffffff' } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

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

            <Box sx={{ p: 1.5, borderTop: '1px solid rgba(64, 224, 255, 0.3)' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about a transaction, risk, or fraud pattern..."
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

export default ChatbotWidget;

