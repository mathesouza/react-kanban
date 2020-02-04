import React from 'react'
import { render } from 'react-dom'
import Board from '../src'
import getUrlParams from './services/getUrlParams'

const board = {
  lanes: [
    {
      id: '0206c8d7-4d48-4d97-b867-86fc2d21074d',
      title: 'Lane Backlog',
      cards: [
        {
          id: '0206c8d7-4d48-4d97-b867-86fc2d21075d',
          title: 'Card title 1',
          description: 'Card content'
        },
        {
          id: 2,
          title: 'Card title 2',
          description: 'Card content'
        },
        {
          id: 3,
          title: 'Card title 3',
          description: 'Card content'
        },
        {
          id: 4,
          title: 'Card title 4',
          description: 'Card content'
        },
        {
          id: 5,
          title: 'Card title 5',
          description: 'Card content'
        },
        {
          id: 6,
          title: 'Card title 6',
          description: 'Card content'
        },
        {
          id: 7,
          title: 'Card title 7',
          description: 'Card content'
        },
        {
          id: 8,
          title: 'Card title 8',
          description: 'Card content'
        }
      ]
    },
    {
      id: 2,
      title: 'Lane Doing',
      cards: [
        {
          id: 9,
          title: 'Card title 9',
          description: 'Card content'
        }
      ]
    }
  ]
}

render(
  <Board
    {...getUrlParams()}
    onLaneRemove={console.log}
    onLaneRename={console.log}
    onCardRemove={console.log}
    allowRenameLane
    initialBoard={board}
    allowAddLane
    onNewLaneConfirm={newLane => {
      return { id: 7889, ...newLane }
    }}
    onLaneNew={console.log}
    onLaneRename={console.log}
    allowAddCard
    onCardNew={console.log}
  />,
  document.getElementById('app')
)
