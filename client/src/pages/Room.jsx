import React, { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000/room');

export default function Room(){
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const [roomId] = useState('demo-room');

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
    ctxRef.current = ctx;

    socket.emit('join', { roomId, user: 'client' });

    socket.on('draw', (data)=>{
      drawFromRemote(data);
    });

    window.addEventListener('resize', onResize);
    return ()=>{
      socket.off('draw');
      window.removeEventListener('resize', onResize);
    }
  },[])

  function onResize(){
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawFromRemote({ fromX, fromY, toX, toY, color, width }){
    const ctx = ctxRef.current;
    ctx.strokeStyle = color || '#000';
    ctx.lineWidth = width || 2;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }

  function handlePointerDown(e){
    drawing.current = true;
    const { clientX: x, clientY: y } = e;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x,y);
    ctxRef.current.lastPos = { x, y };
  }

  function handlePointerMove(e){
    if (!drawing.current) return;
    const { clientX: x, clientY: y } = e;
    const last = ctxRef.current.lastPos || { x, y };
    ctxRef.current.lineTo(x,y);
    ctxRef.current.stroke();
    ctxRef.current.lastPos = { x, y };
    socket.emit('draw', { room: roomId, data: { fromX: last.x, fromY: last.y, toX: x, toY: y } });
  }

  function handlePointerUp(){
    drawing.current = false;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ touchAction: 'none', display:'block' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  )
}
