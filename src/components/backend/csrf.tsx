"use client"
import React from 'react'
import { findBackend } from '@/helper/findBackend';

const API_BASE_URL = findBackend();

function Csrf() {
    const res = fetch(`${API_BASE_URL}/api/csrf/`, {
        credentials: "include",
    })
    return (
        <div></div>
    )
}

export default Csrf