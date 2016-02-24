Player will have an AI instance.
The AI instance will get called at important event. Steps, Grid square changes, etc.
Callbacks will have an event object that the AI can inspect and react to.
AI can keep track of things (how many frames since jumping) in its own scope, if it wants.


Player will have a step and draw.
Step will be set up to take a time parameter so that it can be called more than once per draw.
Step will calculate the next physics state from the current one.
The step calculation should be able to be invalidated and rerun if the AI alters the world. (For example, player will enter new grid space, ai places block there, player no longer enters grid, but collides instead)

Events
gridLocationWillChange
gridLocationDidChange
step
