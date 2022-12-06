import Cows from '../assests/Eat_Mor_Chikin.jpg'

export default function About() {
    return(
        <div className='menu'>
            <center> 
                <h1 className='menuTitle_1'> About </h1> 
            </center>
            <center className='aboutText'>
                The first Chick-fil-A® was founded in Hapeville, Georgia in 1946 by Truett Cathy. Truett believed it was important to close the restaurant on Sundays to give him and his employees a day of rest and the opportunity to worship. This is a tradition that every Chick-fil-A® restaurant continues to uphold to this day. Since the company’s founding, we have spread nationwide with current plans to go international! We are best known for our savory, breaded Chick-fil-A® Chicken Sandwiches and our friendly customer service. Most locations are open Monday through Saturday and serve breakfast from 6:00 a.m. to 10:30 a.m. and lunch and dinner from 10:30 a.m. to 10:00 p.m. It's our pleasure to serve you and your friends and family, so stop by whenever we’re open and remember to... <br/>
            <img src={Cows} alt="Eat More Chicken!"></img>
            </center>
        </div>
    )
}