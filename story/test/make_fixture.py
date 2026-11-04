# Builds fixtures/w0.json: the Monday chapter from claude/story-plan.md, in the shared format, plus placeholder chapters
# for the rest. Every placeholder carries a tag like [D3A] so a test can tell exactly which version is on the screen.
import json
DAYNAMES = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
AXES = ["bold-careful","trust-suspicion","head-heart","lead-follow","truth-kindness","now-later"]

monday = {
 "screens": [
  "The island has 212 people and one ferry. The ferry comes on Sundays.<br><br>You run the shop. The shop is also the post office. So you know things about everyone. Things you have never said out loud.",
  "Monday, 6:40 in the morning. You are opening the door.<br><br>Marta's boy comes running down the hill. Nobody runs here.<br><br>\"The teacher didn't come,\" he says. \"The school is locked.\"",
  "Aurel's house is at the end of the harbour.<br><br>The door is open. The kettle is still warm. His boat is tied up where it always is. His coat is on the hook.",
  "On the kitchen table, three things, laid out neatly:<br><br>His house key.<br>A photo of a woman on a city street. You don't know her.<br>An envelope.",
  "The envelope has a stamp. Your stamp. He bought it on Friday.<br><br>It is addressed to the police on the mainland.<br><br>Under the address, in his small neat writing: *Post this if I am not here to stop you.*",
  "What you know about Aurel:<br><br>He came two years ago. He never said from where.<br>People like him.<br>In two years he has never received one letter. You would know.",
  "One more thing.<br><br>Only one radio on the island reaches the mainland. It belongs to the harbour master.<br><br>Last winter, Aurel asked you about the harbour master. Carefully. The way people ask about the weather.",
  "By nine, the whole island knows. By noon, twelve people have told you what they saw last night. Two of the stories cannot both be true.<br><br>Old Sef says he saw a light on the north cliffs at two in the morning.<br>Marta says Aurel came to the shop yesterday, looking for you. On a Sunday. When the shop was closed.",
  "Night. You are at your own table. The envelope is in front of you.<br><br>In 31 years you have never opened a letter that was not yours.<br><br>The ferry comes in six days."
 ],
 "small": [
  {"after": 1, "axis": "lead-follow", "options": [
    {"text": "Go home. Say nothing yet.", "line": "He goes, but he looks back twice.", "side": "left"},
    {"text": "Go and tell the harbour master.", "line": "He runs again. By seven, everyone will know.", "side": "right"}]},
  {"after": 2, "axis": "bold-careful", "options": [
    {"text": "You go in.", "line": "The floor creaks. Nobody answers.", "side": "left"},
    {"text": "You call his name from the door first.", "line": "Nothing. Then you go in.", "side": "right"}]}
 ],
 "vote": {"question": "Tonight the island decides. What do you do?",
  "A": {"label": "Open it.", "reason": "He is gone. Whatever he knew, you need to know it first.", "axis": "trust-suspicion", "side": "left"},
  "B": {"label": "Don't open it.", "reason": "It is not yours. Keep it safe, say nothing, and watch who comes asking.", "axis": "trust-suspicion", "side": "right"}},
 "glimpse": {
  "A": "You slide a knife under the flap. One page. The first line is your own name.",
  "B": "You put the envelope in your coat and lock the shop. At two in the morning, someone tries the back door. You stay very still. In the morning there are wet footprints on the step. They are not going away from the shop. They are going in."},
 "science": "Most people open it. Curiosity is one of the strongest pulls we have. In studies, people will even take small pain to find out a secret."
}

def chapter(tag, n_screens, day, last=False):
    screens = [f"[{tag}] Screen {i+1} of this placeholder chapter. {DAYNAMES[day-1]}." for i in range(n_screens)]
    small = []
    if not last:
        for k in range(2):
            ax = AXES[(day + k) % 6]
            small.append({"after": 1 + k, "axis": ax, "options": [
                {"text": f"{tag} small {k+1} left", "line": f"{tag} line {k+1} left.", "side": "left"},
                {"text": f"{tag} small {k+1} right", "line": f"{tag} line {k+1} right.", "side": "right"}]})
    ch = {"screens": screens, "small": small}
    if not last:
        ax = AXES[day % 6]
        ch["vote"] = {"question": f"[{tag}] The vote of day {day}. What do you do?",
            "A": {"label": f"Vote{day} A", "reason": f"Reason {day} A.", "axis": ax, "side": "left"},
            "B": {"label": f"Vote{day} B", "reason": f"Reason {day} B.", "axis": ax, "side": "right"}}
        ch["glimpse"] = {"A": f"GLIMPSE-D{day}-A shown to A voters when the world chose B.", "B": f"GLIMPSE-D{day}-B shown to B voters when the world chose A."}
    ch["science"] = f"SCIENCE-D{day}: one plain sentence."
    return ch

days = [{"day": 1, "versions": {"": monday}}]
for d in range(2, 7):
    days.append({"day": d, "versions": {v: chapter(f"D{d}{v}", 4 if d % 2 else 3, d) for v in "AB"}})
days.append({"day": 7, "versions": {k: chapter(f"END-{k}", 3, 7, last=True) for k in ["AA", "AB", "BA", "BB"]}})
w = {"week": 1, "title": "The Ferry Comes Sunday", "genre": "mystery", "keyVotes": [1, 4], "days": days}
json.dump(w, open("fixtures/w0.json", "w"), indent=1, ensure_ascii=False)
print("ok", sum(len(d["versions"]) for d in days), "chapters")
