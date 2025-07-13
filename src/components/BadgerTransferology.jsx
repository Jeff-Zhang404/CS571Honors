// src/components/BadgerTransferology.jsx
import React from "react";
//import { HashRouter } from "react-router-dom";
import BadgerTransNavBar  from "./nav/BadgerTransNavBar";
import { Outlet } from "react-router";


export default function BadgerTransferology() {
  return <div>
    <BadgerTransNavBar />
    <div style={{
                backgroundColor: "white", 
                padding: "1.25rem 0", 
                textAlign: "left" 
            }}>
                <h1 style={{
                    color: "#031F9E", 
                    fontSize: "1.75rem", 
                    margin: 0 
                }}>
                    Badger Breadth Transferology
                </h1>
            </div>
    <div style={{ margin: "1rem" }}>
      <Outlet /> 
    </div>
  </div>
  
}
