// Code for the Nanobar component
'use client';
import { useState, useEffect } from 'react'
import MessageCarousel from './MessageCarousel'

const Nanobar: React.FC<NanobarProps> = ({ messages }) => {

    return (
        <> <MessageCarousel messages={messages} autoPlayInterval={5000} /></>

    );
};

export default Nanobar;