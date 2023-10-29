import React from "react";
import styled from 'styled-components';
import "./header.css";




function Header() {
    const Titulo = styled.h2`
        font-family: 'Bitter', serif;
        font-size: 36px;
        font-weight: bolder;
        text-align: center;
        font-style: normal;
    `;
    return (
        <div className="banner">
            <Titulo>WELCOME TO ODS CLASSIFIER</Titulo>
            <div class="form-control">
                <input class="input input-alt" placeholder="Type something intelligent" required="" type="text"/>
                <span class="input-border input-border-alt"></span>
            </div>
        </div>

    );
}
export default Header;
