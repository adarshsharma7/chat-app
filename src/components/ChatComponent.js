import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage, deleteMessageForMe, editMessage } from '../features/chat/chatSlice';
import { TextField, Button, Box, Typography, Paper, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatComponent = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (input.trim() === '') return;

        if (editIndex !== null) {
            if (messages[editIndex].text === input.trim()) {
                // Do not update if the text hasn't changed
                setEditIndex(null);
                setInput('');
                return;
            }
            dispatch(editMessage({ index: editIndex, newText: input }));
            setEditIndex(null);
        } else {
            dispatch(sendMessage({ text: input, user: 'User1', timestamp: new Date().toLocaleTimeString(), sentByCurrentUser: true }));
        }

        setInput('');

        setTimeout(() => {
            dispatch(receiveMessage({ text: 'Hello from User2!', user: 'User2', timestamp: new Date().toLocaleTimeString(), sentByCurrentUser: false }));
        }, 2000);
    };

    const handleEdit = () => {
        setInput(messages[selectedMessageIndex].text);
        setEditIndex(selectedMessageIndex);
        handleCloseMenu();
    };

    const handleDeleteForMe = () => {
        dispatch(deleteMessageForMe(selectedMessageIndex));
        handleCloseMenu();
    };

    const handleMenuClick = (event, index) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedMessageIndex(index);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
        setSelectedMessageIndex(null);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '600px' }, margin: 'auto', p: 2 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, height: { xs: '50vh', sm: '60vh' }, overflowY: 'auto', backgroundColor: '#f0f2f5' }}>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <Box
                            key={index}
                            mb={2}
                            display="flex"
                            flexDirection={msg.sentByCurrentUser ? 'row-reverse' : 'row'}
                            alignItems="center"
                            position="relative"
                        >
                            <Avatar sx={{ bgcolor: msg.sentByCurrentUser ? '#1976d2' : '#f50057', marginLeft: msg.sentByCurrentUser ? 0 : 1, marginRight: msg.sentByCurrentUser ? 1 : 0 }}>
                                {msg.user[0]}
                            </Avatar>
                            <Box
                                sx={{
                                    backgroundColor: msg.sentByCurrentUser ? '#1976d2' : '#f50057',
                                    color: 'white',
                                    borderRadius: 2,
                                    p: 1,
                                    pr: 4, // Added padding-right to create space for the icon
                                    maxWidth: '70%',
                                    textAlign: msg.sentByCurrentUser ? 'right' : 'left',
                                    wordWrap: 'break-word',
                                    position: 'relative' // Keeps relative positioning for the icon to be placed inside
                                }}
                            >
                                <Typography variant="body2" color="white">
                                    {msg.text}
                                </Typography>
                                {msg.edited && (
                                    <Typography variant="caption" color="lightgray" sx={{ display: 'block', textAlign: 'right' }}>
                                        Edited
                                    </Typography>
                                )}
                                <Typography variant="caption" color="white" sx={{ display: 'block', textAlign: 'right' }}>
                                    {msg.timestamp}
                                </Typography>

                                {/* Three Dots Icon Positioned at Top-Right, Outside Text Area */}
                                {msg.sentByCurrentUser && (
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleMenuClick(e, index)}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: 4,
                                            transform: 'translateY(-50%)', // Center vertically
                                            color: 'white'
                                        }}
                                    >
                                        <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1" color="gray" sx={{ textAlign: 'center', mt: 4 }}>
                        No messages available
                    </Typography>
                )}

                <div ref={chatEndRef} />
            </Paper>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{ mb: { xs: 1, sm: 0 }, flex: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    sx={{ ml: { sm: 1 }, width: { xs: '100%', sm: 'auto' }, mt: { xs: 1, sm: 0 } }}
                >
                    {editIndex !== null ? 'Update' : 'Send'}
                </Button>
            </Box>

            {/* Popup Menu for Edit/Delete */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" /> Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteForMe}>
                    <DeleteIcon fontSize="small" /> Delete
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ChatComponent;
