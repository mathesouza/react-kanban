import React from 'react'
import { render } from '@testing-library/react'
import Lane, { StyledLane } from './'

describe('<Lane />', () => {
  let subject

  const renderCard = jest.fn((_, { title }) => <div>{title}</div>)

  const lane = {
    id: 1,
    title: 'Backlog',
    cards: [
      {
        id: 1,
        title: 'Card title 1',
        description: 'Card content'
      },
      {
        id: 2,
        title: 'Card title 2',
        description: 'Card content'
      }
    ]
  }

  function mount({ children = lane, ...otherProps } = {}) {
    subject = render(
      <Lane {...otherProps} renderLaneHeader={() => <div>Backlog</div>} renderCard={renderCard}>
        {children}
      </Lane>
    )
    return subject
  }

  function reset() {
    subject = undefined
    renderCard.mockClear()
  }

  beforeEach(reset)

  it('renders a lane', () => {
    expect(mount().container.querySelector('div')).toBeInTheDocument()
  })

  it("renders the lane's header", () => {
    expect(mount().queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  describe("about the lane's card", () => {
    beforeEach(() => mount())

    it('renders the specified cards in the lane ordered by its specified position', () => {
      const cards = subject.queryAllByText(/^Card title/)
      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1/)
      expect(cards[1]).toHaveTextContent(/^Card title 2/)
    })

    it('calls the "renderCard" passing the lane, the card and whether the card is dragging or not', () => {
      expect(renderCard).toHaveBeenCalledWith(lane, expect.objectContaining({ id: 1, title: 'Card title 1' }), false)
    })
  })
})

describe('<StyledLane />', () => {
  it('renders a lane', () => {
    expect(render(<StyledLane />).container.querySelector('div')).toBeInTheDocument()
  })
})

describe.skip('about the card adding', () => {
  const onCardNew = jest.fn()

  describe('when the component does not receive the "allowAddCard" prop', () => {
    beforeEach(() => mount({ onCardNew }))

    it('does not show the add card button', () => {
      expect(subject.queryByText('+')).not.toBeInTheDocument()
    })
  })

  describe('when the component receives the "allowAddCard" prop', () => {
    beforeEach(() => mount({ onCardNew, allowAddCard: true }))

    it('shows the add card button', () => {
      expect(subject.queryByText('+')).toBeVisible()
    })

    describe('when the user clicks on the add card button', () => {
      beforeEach(() => fireEvent.click(subject.queryByText('+')))

      it('shows the add card form', () => {
        expect(subject.container.querySelector('form')).toBeVisible()
      })

      describe('when the user cancels the card adding', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('Cancel')))

        it('hides the add card form', () => {
          expect(subject.container.querySelector('form')).not.toBeInTheDocument()
        })
      })
    })
  })
})
