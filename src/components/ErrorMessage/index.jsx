import React from 'react';
import styled from 'styled-components';

const Error = styled.h3`
    display: inline;
    color: red;
`;

const Center = styled.div`
    text-align: center;
`;

const ErrorMessage = () =>
    <Center>
        <Error>Something went wrong</Error>
    </Center>;

export default ErrorMessage;