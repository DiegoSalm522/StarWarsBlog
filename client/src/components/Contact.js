import profilePic from "../images/contact/profilepic.jpg";

export default function Contact(){
  return(
    <div>
      <img src={profilePic} alt="" className="img-contact"/>
      <h2>Diego García de los Salmones Ajuria</h2>
      <h2>diegosalm522@gmail.com</h2>
      <h2>+52 228 146 2719</h2>
    </div>
  );
}