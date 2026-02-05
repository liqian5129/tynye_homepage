import { Note, Insight } from '../types';

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    type: 'text',
    bookTitle: 'Thinking, Fast and Slow',
    content: 'The confidence that individuals have in their beliefs depends mostly on the quality of the story they can tell about what they see, even if they see little.',
    userSubNotes: 'This connects to the concept of Narrative Fallacy. I need to cross-reference this with Taleb\'s work.',
    tags: ['Psychology', 'Bias'],
    date: '2023-10-24',
    synced: true,
    exported: false
  },
  {
    id: '2',
    type: 'excerpt',
    bookTitle: 'Atomic Habits',
    content: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    originalImage: 'https://picsum.photos/400/200?grayscale',
    userSubNotes: 'Remind myself to review my morning routine system next Sunday.',
    tags: ['Self-help', 'Productivity'],
    date: '2023-10-22',
    synced: true,
    exported: false
  },
  {
    id: '3',
    type: 'audio',
    bookTitle: 'Sapiens',
    content: 'Discussion about the cognitive revolution. The ability to speak about fiction is the most unique feature of Sapiens language.',
    audioDuration: '04:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample MP3
    timestamps: ['00:45 - Cognitive Revolution defined', '02:15 - Importance of Gossip', '03:50 - Collective Fictions'],
    userSubNotes: 'Interesting point: Fiction allows for flexible cooperation in large numbers.',
    tags: ['History', 'Anthropology'],
    date: '2023-10-20',
    synced: true,
    exported: true
  },
  {
    id: '4',
    type: 'text',
    bookTitle: 'The Design of Everyday Things',
    content: 'Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.',
    userSubNotes: 'Check Norman Doors examples online.',
    tags: ['Design', 'UX'],
    date: '2023-10-15',
    synced: true,
    exported: false
  },
  {
    id: '5',
    type: 'chat',
    bookTitle: 'Zero to One',
    content: 'Debate on Monopoly vs Competition. Thiel argues that capitalism and competition are opposites.',
    audioDuration: '12:05',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Sample MP3
    timestamps: ['01:10 - Perfect Competition model', '05:30 - Monopoly profits', '09:00 - Google example'],
    userSubNotes: 'Need to re-read Chapter 3. Is the "Creative Monopoly" concept applicable to small businesses?',
    tags: ['Business', 'Startups'],
    date: '2023-10-10',
    synced: false,
    exported: false
  }
];

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: 'i1',
    title: 'Weekly Reading Report',
    date: '2023-10-25',
    content: 'This week you focused heavily on behavioral psychology and habit formation. The connection between "System 1/2" thinking from Kahneman and "Atomic Habits" suggests a strong interest in subconscious decision making. Your notes indicate you are looking for practical applications of these theories.',
    sourceNoteCount: 12,
    dateRange: 'Oct 18 - Oct 25',
    tags: ['Psychology', 'Habits', 'Weekly Review']
  },
  {
    id: 'i2',
    title: 'Deep Dive: Cognitive History',
    date: '2023-10-21',
    content: 'Based on your recent notes from "Sapiens" and "Guns, Germs, and Steel", you are exploring the macro-history of human development. Specifically, the "Cognitive Revolution" notes highlight an interest in how shared fictions (money, religion, nation) enable cooperation.',
    sourceNoteCount: 8,
    dateRange: 'Oct 10 - Oct 20',
    tags: ['History', 'Anthropology', 'Synthesis']
  }
];