

export function CarComponent(props) {
   return <div style={{display:'flex', flexDirection:'column', marginTop:'1rem', gap:'0.3rem'}}>
      <span>Manufacturer: <span style={{fontWeight:'bold'}}>{props.manufacturer}</span></span>
      <span>Year: <span style={{fontWeight:'bold'}}>{props.year.toLocaleDateString()}</span></span>
      <span>Passengers: <span style={{fontWeight:'bold'}}>{props.passengers}</span></span>
   </div>
}