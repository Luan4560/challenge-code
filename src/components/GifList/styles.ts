import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;


  input {
    background-color: transparent;
    border: 0;
    border: 1px solid ${props => props.theme["gray-500"]};
    border-radius: 6px;
    padding: 0.45rem;
    color: ${props => props.theme.white};
  }

  button {
    background-color: ${props => props.theme["green-500"]};
    border: 1px solid ${props => props.theme['green-500']};
    padding: 0.45rem;
    border-radius: 6px;
    color:  ${props => props.theme.white};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${props => props.theme["green-300"]};
    }
  }
`
export const Form = styled.form`
  display: flex;
  gap: 0.75rem;
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

`

export const Card = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  border-radius: 6px;
  width: 250px;


  img {
    object-fit: contain;
    width: 100%;
    padding: 1rem;
    border: 1px solid ${props => props.theme["gray-500"]};
    border-radius: 6px;
  }
`
export const LoadingContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
`