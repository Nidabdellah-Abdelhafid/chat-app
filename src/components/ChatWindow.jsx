import React, { useEffect, useState, useRef, createRef } from 'react';
import { Container, Row, Col, Image, Modal } from 'react-bootstrap';
import axios from 'axios';
import socket from './socket.js';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './ChatWindow.css';
import './chatStyle.css';
import 'react-image-lightbox/style.css';
import bgChat from '../assets/images/bgChat.jpg';

const URL_BACKEND = 'http://192.168.11.106:1337';

const ChatWindow = ({ user }) => {
    const [message, setMessage] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messagea, setMessagea] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreview, setFilePreview] = useState(null); // State for file preview
    const chatBodyRef = useRef(null);
    const inputRef = createRef();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [rotationAngles, setRotationAngles] = useState({});

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${URL_BACKEND}/api/messages?populate=*&pagination[limit]=-1`);
            const messages = response.data.data;

            const currentUserEmail = user?.email;
            const adminEmail = 'admin@atlasvoyage.com';

            const filteredMessages = messages.filter(message => {
                const senderEmail = message?.attributes.sender?.data?.attributes.email;
                const receiverEmail = message?.attributes.receiver?.data?.attributes.email;

                return (senderEmail === currentUserEmail && receiverEmail === adminEmail) ||
                    (senderEmail === adminEmail && receiverEmail === currentUserEmail);
            });

            setMessage(filteredMessages);
            setFilteredMessages(filteredMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [user]);

    useEffect(() => {
        socket.on('recvMsg', (message) => {
            setMessage((prevMessages) => [...prevMessages, message]);
            fetchMessages();
        });

        return () => {
            socket.off('recvMsg');
        };
    }, [message]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [filteredMessages]);

    useEffect(() => {
        const filtered = message.filter(msg => msg.attributes?.content?.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredMessages(filtered);
    }, [searchTerm, message]);

    if (!user) {
        return (
            <div
                className="align-items-center justify-content-center"
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                <div className="card text-dark mx-2">
                    <img src={bgChat} className="card-img" alt="..." height="530px" width="100%" />
                    <div
                        className="card-img-overlay d-flex align-items-center justify-content-center"
                        
                    >
                        <div className="text-center">
                            <h1 className="card-title fs-1 fw-bolder">Hello there</h1>
                            <p className="card-text fs-4 fw-bolder">Select user to start chatting.</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${formattedDate} ~ ${formattedTime}`;
    };

    const sendMessage = async (e) => {
        setShowEmojiPicker(false);
        e.preventDefault();
        if (!user || (!messagea && selectedFiles.length === 0)) {
            alert("🚫 Le message est vide ou aucun fichier sélectionné!");
            return;
        }
        const newMessage = {
            content: messagea,
            sender: 1,
            receiver: user?.id
        };
        if (selectedFiles.length > 0) {
            const formData = new FormData();
            formData.append('files.document', selectedFiles[0]);
            formData.append('data', JSON.stringify(newMessage));

            try {
                const uploadResponse = await axios.post(`${URL_BACKEND}/api/messages`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (uploadResponse.status === 200) {
                    setMessagea('');
                    setSelectedFiles([]);
                    setFilePreview(null);
                    fetchMessages();
                } else {
                    console.error(`Unexpected status code: ${uploadResponse.status}`);
                    alert(`Unexpected status code: ${uploadResponse.status}`);
                    return;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file');
                return;
            }
        } else if (selectedFiles.length === 0) {
            socket.emit('sendMsg', newMessage);
            setMessagea('');
            setSelectedFiles([]);
            fetchMessages();
        }
    };

    const handleZoomOut = () => {
        setSelectedImage('');
        setIsOpen(false);
        setRotationAngles({});
    };

    const handleRotate = (url, direction) => {
        setRotationAngles(prevAngles => ({
            ...prevAngles,
            [url]: (prevAngles[url] || 0) + direction
        }));
    };

    const handleImageClick = (url) => {
        setSelectedImage(url);
        setIsOpen(true);
    };

    const renderMessages = () => {
        return filteredMessages.map(message => (
            <div key={message.id} className={`chat mt-4 ${message?.attributes?.sender?.data?.attributes?.username === 'admin' ? 'chat-end' : 'chat-start'}`}>

                <div className="chat-image avatar">
                    <div className="w-10 rounded-circle">
                        {message?.attributes?.sender?.data?.attributes?.username === 'admin' ?
                            <Image src='https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/75/cc/7c/75cc7cf2-516f-b0f4-a8ed-3baccc1abcbf/source/512x512bb.jpg'
                                height={50}
                                width={50}
                                className="rounded-circle"
                                alt="Tailwind CSS chat bubble component" /> :
                            <Image
                                height={50}
                                width={50}
                                className="rounded-circle"
                                src={`${URL_BACKEND}${user.image.url}`} alt="Tailwind CSS chat bubble component" />}

                    </div>
                </div>
                <div className="chat-header bg-white">
                    ~{message?.attributes?.sender?.data?.attributes?.username}~

                </div>
                <div className="chat-bubble">
                    {message?.attributes?.content}
                    {message?.attributes?.document?.data ? (
                        <div className="message-file">
                            {message.attributes.document?.data.attributes.mime.includes('image') ? (
                                <div className="message-image">
                                    <Image
                                        src={`${URL_BACKEND}${message.attributes.document?.data.attributes.url}`}
                                        alt="Image"
                                        onClick={() => handleImageClick(`${URL_BACKEND}${message.attributes.document?.data.attributes.url}`)}
                                        style={{
                                            width: 'auto',
                                            maxWidth: '100%',
                                            height: 'auto',
                                            maxHeight: '300px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            transform: `rotate(${rotationAngles[`${URL_BACKEND}${message.attributes.document?.data.attributes.url}`] || 0}deg)`
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="message-document" style={{
                                    backgroundColor: '#e4f2de', // Light green background similar to WhatsApp
                                    padding: '10px', // Padding for content inside the box
                                    borderRadius: '10px', // Rounded corners
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Slight shadow effect for depth
                                }}>
                                    <div style={{
                                        width: '10px', // Size of the PDF icon
                                        height: '40px',
                                        backgroundColor: '#FF4B4B', // PDF icon color (WhatsApp's red for PDFs)
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: '12px',
                                    }}>
                                        <i className="fa fa-file-pdf" style={{
                                            color: '#fff', // White color for the icon
                                            fontSize: '18px',
                                        }}></i>
                                    </div>
                                
                                    <div style={{ flex: 1 }}>
                                        <a href={`${URL_BACKEND}${message.attributes.document?.data.attributes.url}`} 
                                           target="_blank" 
                                           rel="noopener noreferrer" 
                                           className="text-color-white" 
                                           style={{
                                                textDecoration: 'none', // Removing underline
                                                color: '#075E54', // WhatsApp text color
                                                fontWeight: '500', // Bold text
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis', // Truncating long names
                                                whiteSpace: 'nowrap', // Prevent wrapping of long text
                                        }}>
                                            {message.attributes.document?.data.attributes.name}
                                        </a>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#777', // Light gray text color for additional info
                                        }}>
                                        type {message.attributes.document?.data.attributes.ext}
                                        </div>
                                    </div>
                                </div>
                                
                            )}
                        </div>
                    ) : null}
                </div>
                <div className="chat-footer bg-white">Sent at {formatDateTime(message?.attributes?.createdAt)}</div>
            </div>

        ));
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e);
            setShowEmojiPicker(false);

        }
    };

    const onEmojiClick = (emoji) => {
        const emojiChar = emoji.native;
        setMessagea(prevMessagea => prevMessagea + emojiChar);
    };

    const handleShowEmojis = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleFocus = () => {
        setShowEmojiPicker(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFiles([file]);
        setFilePreview(URL.createObjectURL(file));
    };

    return (
        <Container style={{ height: '70hv' }} className='col-md-9 col-sm-12 '>
            <Row className="chat-header mb-2 bg-light">
                <div className='d-flex align-items-center'>
                    <div className="avatar online">
                        <div className="w-20 rounded-circle">
                            <Image
                                height={60}
                                width={60}
                                src={`${URL_BACKEND}${user.image.url}`}
                                className='rounded-circle'
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-20">
                        <p className="text-center mx-2">{user.username}</p>
                    </div>
                </div>
            </Row>
            <Row className="search-bar ">
                <Col className="search-bar-wrapper bg-light shadow-sm">
                    <i className="bi bi-search search-icon"></i><input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row className="overflow-auto" ref={chatBodyRef} style={{ height: '50vh' }}>
                <Col >
                    {renderMessages()}
                </Col>
            </Row>
            <Modal show={isOpen} onHide={handleZoomOut}>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="img-fluid"
                            style={{ transform: `rotate(${rotationAngles[selectedImage] || 0}deg)` }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <i onClick={() => window.open(selectedImage, '_blank')} className="bi bi-download" style={{ cursor: 'pointer', width: 40, fontSize: 25 }}></i>
                    <i onClick={() => handleRotate(selectedImage, 90)} className="bi bi-arrow-clockwise" style={{ cursor: 'pointer', width: 40, fontSize: 25 }}></i>
                    <i onClick={() => handleRotate(selectedImage, -90)} className="bi bi-arrow-counterclockwise" style={{ cursor: 'pointer', width: 40, fontSize: 25 }}></i>
                    <i onClick={handleZoomOut} className="bi bi-x-circle" style={{ cursor: 'pointer', width: 40, fontSize: 25 }}></i>
                </Modal.Footer>
            </Modal>

            <div className="d-flex align-items-center p-3 bg-light shadow-sm col-12">
                <i onClick={handleShowEmojis} className="bi bi-emoji-smile" style={{ cursor: 'pointer' }}></i>
                {showEmojiPicker &&
                    <div style={{ position: 'absolute', bottom: 70, }}>
                        <Picker data={data} onEmojiSelect={onEmojiClick} emojiSize={20} />
                    </div>
                }
                <div className="flex-grow mx-2 col-10">
                    <input
                        value={messagea}
                        onChange={(e) => setMessagea(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                        type="text"
                        className="form-control  col-10 rounded-pill"
                        ref={inputRef}
                        onFocus={handleFocus}
                    />
                </div>
                <div className="mx-2">
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        className="d-none"
                    />
                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                        <i className="bi bi-paperclip"></i>
                    </label>
                </div>
                <button onClick={sendMessage} type="submit" className="btn btn-dark ml-2">
                    <i className="bi bi-send"></i>
                </button>
            </div>

            {filePreview && (
                <div className="file-preview">
                    <Image src={filePreview} alt="Preview" width="60" height="auto" rounded />
                </div>
            )}
        </Container>
    );
};

export default ChatWindow;
