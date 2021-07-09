import React, {Component} from "react";
// import Timeline from "react-native-beautiful-timeline";
import { Chrono } from "react-chrono";

export default class ReservationTimelinesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items:[],
        };
    }

    componentWillMount() {
        this.setState({
            items:[
                {
                title: "July 2020",
                cardTitle: "Beginning",
                cardSubtitle:
                    "I wonder whether the stars are set alight in heaven so that one day each one of us may find his own again.",
                cardDetailedText: ["I like your voice when the first time I saw you. " +
                "We had a dinner together and toke some walks besides the river. " +
                "I was so glad that you send me a message after our first date. " +
                "And then, our story begins. ",
                    "We had Korean food, watched movies, went to cat coffee and so on. " +
                    "I still remember when we sit somewhere at Osaka station, you talked about your last relation. " +
                    "At that moment, I do hope that beauty moment will last forever. " +
                    "But luckily, we have spent almost one year from that time."],
            },
                {
                    title: "Aug 2020",
                    cardTitle: "Dating",
                    cardSubtitle:
                        "If you tame me, then we shall need each other. " +
                        "To me, you will be unique in all the world. To you, I shall be unique in all the world...",
                    cardDetailedText: ["Our relation began after a hot pot? I remember the first time I kissed you at one Karaoke. " +
                    "To me, it was the softest and sweetest thing in the world. ",
                        "The first day you stay at my home, the day we went to AbenoHarukas, " +
                        "the day we went to escape game, so much fun that I felt when stay with you. "],
                },
                {
                    title: "Spe & Oct 2020",
                    cardTitle: "Travel",
                    cardSubtitle:
                        "What moves me so deeply, about this little prince who is sleeping here, is his loyalty to a flower.",
                    cardDetailedText: ["We had a trip to Awaji island, I feel sorry that I got sick that time. " +
                    "I slept early that night, and woke up finding you were in my side. " +
                    "I cannot stop thinking kissing you that moment. " +
                    "I like traveling with you no matter where it is. "],
                },
                {
                    title: "Nov & Dec 2020",
                    cardTitle: "Game",
                    cardSubtitle:
                        "If, for example, you come at four o'clock in the afternoon, " +
                        "then at three o'clock I shall begin to be happy.",
                    cardDetailedText: [
                        "We had a one-day trip to see Japanese maple leaves. " +
                        "I like the time in the car, as I feel only two of us are in the world.",
                        "We spent a lot of time playing Switch games, and it never got tired. " +
                    "We played side-by-side, and I could hug you for every moment." +
                    "I enjoy the moment with you even do noting."],
                },
                {
                    title: "Jan ~ Mar 2021",
                    cardTitle: "Daily",
                    cardSubtitle:"It is the time you have wasted for your rose that makes your rose so important.",
                    cardDetailedText: ["We were been busy for our graduation of campus, " +
                    "but I do appreciate that you came to my home and played games together.",
                    "I know I have to move to Tokyo for my job, " +
                    "but I want to spend every moment with you as possible as I could, and as always."],
                },
                {
                    title: "Apr ~ Jun 2021",
                    cardTitle: "Work",
                    cardSubtitle:
                        "The stars are beautiful, because of a flower that cannot be seen.",
                    cardDetailedText: ["So sorry that I have to go to Tokyo, but I'd like to come and find you every 2 weeks." +
                    "I wish I could come every week, but considering about the fee, hoping I will go back to Osaka next year.",
                        "When you moved to your new home and felt lonely, " +
                        "I don't know how to comfort you instead of staying with you." +
                        "I like the days in your room but I also wish you could pass these days alone. " +
                        "Anyway, thanks to TV. ^(--)^"
                    ],
                },
                {
                    title: "July 2021",
                    cardTitle: "Birthday",
                    cardSubtitle:
                        "Happy birthday! ",
                    cardDetailedText: ["We are going to have a cat together! " +
                    "This means a lot for having the cat at the same day on your birthday. " +
                    "Hoping she can attract you to come to Tokyo. "
                    ],
                },
                {
                    title: "~",
                    cardSubtitle: "To be continue",
                }]
        })
    }


    render() {
        const {items} = this.state;
        console.log("item", items);
        return (
            <div className="col-12">
                <Chrono
                    items={items}
                    mode="VERTICAL"
                    cardHeight={10}
                    // flipLayout={true}
                    // useReadMore={false}
                />
            </div>
        );
    }
}