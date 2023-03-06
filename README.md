# 1. Detail interaction scenario

Target Audience:
The story is intended for people who are grieving the loss of a loved one. The target audience could be individuals who are dealing with recent loss or those who have been dealing with grief for some time. The interaction scenarios should be engaging and meaningful for them, providing a safe space for them to express their emotions.

Goal:
The goal of the project is to help individuals remember and connect with their lost loved ones. The purpose is to create an immersive and interactive experience that provides a safe and comforting space for individuals to release their emotions.

Characters:
The main character in the story is the user, the individual who has lost a loved one. The loved one is also a character in the story, represented through the interactive elements of the installation. This character will be developed in such a way that it feels like they are listening and responding to the user.

Setting:
The setting of the story is a virtual environment that resembles the wilderness, a place of solace and peace. The user stands alone in the wilderness with a campfire, surrounded by stars in the night sky. This setting adds to the overall experience of the interaction scenarios, creating an immersive and peaceful environment that will help the user to connect with their lost loved one.

Plot:
The plot of the story revolves around the user's desire to connect with their lost loved one. As the user dials the phone and begins to speak, the virtual environment responds, making the user feel as though their loved one is listening and responding. The Phone booth becomes a mean for transportation between our reality to a spiritual place. The user has an opportunity, allowing them to release their emotions and connect with their loved one in a meaningful way.

Interactivity:
The audience interacts with the story by dialing the phone and speaking to their lost loved one. The virtual environment responds, providing an interactive experience that feels like the loved one is listening and responding. The music, SFX and VFX develop interactively, creating a responsive and immersive environment that allows the user to express their emotions.

Technology:
The technology used to tell the story includes a phone booth, a VR headset and Oculus passthrough layer. The Oculus passthrough layer allows for a gradual transition from reality to virtual reality, enhancing the immersive experience. The VR headset provides the user with a visual experience of the virtual environment, while the phone booth allows them to speak to their loved one in a private and intimate space. And music integration is done by Wwise.

Testing:
The project will be tested by team members to engage with the installation and provide feedback. The installation will also be tested for technical issues to ensure a seamless and immersive experience for the user.

Teamwork:
Music will be done by Noah. Soundscape will be done by Zochu. And Wwise implementation will be done by Noah and Zochu together. Unity 3D scene design and network connection will be done by Toby.

Interaction Scenario:
As the user enters the phone booth, they see a HMD (Quest Pro). The user puts on the VR headset. They see UI messages saying, "Think about your lost loved ones", "They might be still out there looking after you", "Try having conversation with them". And then they dial numbers on the phone. As the ringtone finishes, the passthrough layer's opacity steadily decreases, and eventually disappears as the immersive experience begins. They are alone by a wilderness environment, complete with stars in the night sky and a campfire.  
The user speaks to their loved one, asking for advice and guidance, expressing their feelings of loss and sadness, or sharing happy memories. As the user speaks, they hear the music, SFX and see VFX develop interactively, making them feel as though their loved one is listening and responding. The user interacts with their lost loved one in a meaningful way.

# 2. Tasks

### Wwise

```diff
- Ambient music implementation: Noah
+ Soundscape implementation: Zochu
! Establish network communication to Oculus App: Toby
```

### Unity

```diff
- Music interactivity with user's voice input: Noah
+ Soundscape interactivity with user's voice input: Zochu
! prepare systems for voice interactivity: Toby
```

### Others

```diff
- Music composition: Noah
+ Soundscape recording: Zochu
! Visual elements: Toby
```

# 3. Determination of learning

I will learn how android application send HTTP request with user permission
and sending HTTP request on Juce side as well.
