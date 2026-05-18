function Card({ card, handleClick }) {

  return (

    <div
      className="card"
      onClick={() => handleClick(card.name)}
    >

      <img
        src={card.sprites.front_default}
        alt={card.name}
      />

      <h3>{card.name}</h3>

    </div>

  )
}

export default Card