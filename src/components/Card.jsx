// A results object will look like:
// {
//   "id": "pk_81c533c3a38c4116834f5568f6f60391cd7233f615e695bc9eb1b64eaec2a50b1d13d817a3ebc88ce1312274e8eb19a0",
//   "card_info": {
//       "name": "Charizard ex - 185/165",
//       "clean_name": "Charizard ex 185 165",
//       "set_name": "SV2a: Pokemon Card 151",
//       "set_code": "SV2a",
//       "set_id": "23599",
//       "card_number": "185/165",
//       "rarity": "Super Rare",
//       "card_type": "Fire",
//       "hp": "330.0",
//       "stage": "Stage 2",
//       "card_text": null,
//       "attacks": [
//           "[Fire] Brave Wing (60+)<br> If this Pokémon has any damage counters on it, this attack does 100 more damage.",
//           "[Fire][Fire][Fire][Fire] Explosive Vortex (330)<br> Discard 3 Energy from this Pokémon."
//       ],
//       "weakness": "Water x2",
//       "resistance": null,
//       "retreat_cost": "2.0"
//   },
//   "tcgplayer": {
//       "prices": [
//           {
//               "low_price": 21.26,
//               "mid_price": 23.89,
//               "high_price": 49,
//               "updated_at": "2026-05-06T07:47:29.819843",
//               "market_price": 22.78,
//               "direct_low_price": null,
//               "sub_type_name": "Holofoil"
//           }
//       ],
//       "url": "https://www.tcgplayer.com/product/566528"
//   },
//   "cardmarket": {
//       "product_name": "Charizard ex (sv2a 185)",
//       "prices": [
//           {
//               "avg": 32.92,
//               "low": 15,
//               "avg1": 16,
//               "avg7": 36.54,
//               "avg30": 33.14,
//               "trend": 39.88,
//               "updated_at": "2026-05-06T06:37:34.580284",
//               "variant_type": "normal"
//           },
//           {
//               "avg": null,
//               "low": null,
//               "avg1": null,
//               "avg7": null,
//               "avg30": null,
//               "trend": 0,
//               "updated_at": "2026-05-06T06:37:34.580284",
//               "variant_type": "holo"
//           }
//       ],
//       "product_url": "https://www.cardmarket.com/en/Pokemon/Products/Singles/Pokemon-Card-151/Charizard-ex-V2-sv2a185"
//   }
// },
import { useEffect, useState } from "react"
import CardImage from "./CardImage";

const Card = ({ card }) => {

  return (
    // <li> for now
    <li>
      {/* Let's just start with this */}
      <h2>{card.card_info.name}</h2>

      {/* Just noticing now that this endpoint... doesn't have images. That's a bummer. Let's check the API docs. */}
      {/* Right. Images have their own endpoint: GET /images/:id with the id under the 'id' key in a results object */}
      {/* I'm gonna try it in Postman with the id above */}
      {/* The most confusing thing about the images endpoint is that is reutrns a jpg?? And not an image URL? For next focus block */}
      {/* <img  /> */}
      < CardImage cardId={card.id} cardName={card.card_info.name} />
    </li>
  )
}

export default Card