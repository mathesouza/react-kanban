import React, { useState } from 'react'
import styled from 'styled-components'
import CursorPointer from '../CursorPointer'

const LaneHeaderSkeleton = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  span:nth-child(2) {
    cursor: pointer;
  }
`

const DefaultButton = styled.button`
  color: #333333;
  background-color: #ffffff;
  border-color: #cccccc;

  :hover,
  :focus,
  :active {
    background-color: #e6e6e6;
  }
`

const Input = styled.input`
  :focus {
    outline: none;
  }
`
const AddCardButton = styled.button`
  width: 100%;
  margin-top: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
  :hover {
    transition: 0.3s;
    background-color: #ccc;
  }
  //
`

function LaneTitle({ allowRenameLane, onClick, children: title }) {
  return allowRenameLane ? <CursorPointer onClick={onClick}>{title}</CursorPointer> : <span>{title}</span>
}

function useRenameMode(state) {
  const [renameMode, setRenameMode] = useState(state)

  function toggleRenameMode() {
    setRenameMode(!renameMode)
  }

  return [renameMode, toggleRenameMode]
}

export default function({ children: lane, allowRemoveLane, onLaneRemove, allowRenameLane, onLaneRename, onCardAdd }) {
  const [renameMode, toggleRenameMode] = useRenameMode(false)
  const [title, setTitle] = useState(lane.title)
  const [titleInput, setTitleInput] = useState('')
  const [addingCard, setAddingCard] = useState(false)

  function handleCardAdd(event) {
    event.preventDefault()
    onCardAdd(lane, { id: 4, title: 'Card adicionado', description: 'Testando' })
  }

  function handleRenameLane(event) {
    event.preventDefault()

    onLaneRename(lane, titleInput)
    setTitle(titleInput)
    toggleRenameMode()
  }

  function handleRenameMode() {
    setTitleInput(title)
    toggleRenameMode()
  }

  return (
    <LaneHeaderSkeleton>
      {renameMode ? (
        <form onSubmit={handleRenameLane}>
          <span>
            <Input
              type='text'
              value={titleInput}
              onChange={({ target: { value } }) => setTitleInput(value)}
              autoFocus
            />
          </span>
          <span>
            <DefaultButton type='submit'>Rename</DefaultButton>
            <DefaultButton type='button' onClick={handleRenameMode}>
              Cancel
            </DefaultButton>
          </span>
        </form>
      ) : (
        <>
          <LaneTitle allowRenameLane={allowRenameLane} onClick={handleRenameMode}>
            {title}
          </LaneTitle>
          <AddCardButton onClick={() => setAddingCard(!addingCard)}>➕</AddCardButton>
          {addingCard && (
            <form onSubmit={handleCardAdd} style={{ width: '100%' }}>
              <input type='text' />
              <button type='submit'>Salvar</button>
            </form>
          )}
        </>
      )}
    </LaneHeaderSkeleton>
  )
}
