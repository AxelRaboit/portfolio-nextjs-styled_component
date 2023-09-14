import styled from "styled-components";

export const Container = styled.div`
    position: relative;
`;

export const Buttons = styled.div`
    button {
        width: 2rem;
        height: 2rem;
        background-color: var(--color-primary);
        color: var(--color-light);
        filter: var(--drop-shadow-green);
        cursor: pointer;
        border: none;
        position: absolute;
        top: 45%;
        right: -1rem;

        &:hover {
            filter: var(--drop-shadow-green-darker);
        }
    }

    .back {
        left: -1rem;
    }
`;