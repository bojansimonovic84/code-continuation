

## Import PorukeAI - Your AI Message Generator App

I'll import your complete app from GitHub and set it up here. Here's what will be brought over:

### Phase 1: Core Structure
- Import all pages (Landing, Auth, Index/Main App)
- Set up routing with your existing navigation
- Import all custom components (MessageGenerator, MessageHistory, GoalSelector, ToneSelector, SituationSelector, etc.)

### Phase 2: Authentication & State
- Set up AuthContext for user management
- Set up LanguageContext for multi-language support
- Configure providers in App.tsx

### Phase 3: Styling
- Import your custom CSS with gradient surfaces and styling

### Phase 4: Backend Integration
After the code is imported, you'll need to:
- Connect to Lovable Cloud (or bring your Supabase credentials)
- Set up the database tables (profiles, messages)
- Create the `get_user_message_count` database function

### What You'll Have Working
1. **Landing page** with app introduction
2. **Auth page** for login/signup
3. **Main app** with step-by-step message generation:
   - Goal selection (what you want to achieve)
   - Situation selection (context)
   - Tone selection (how it should sound)
   - AI message generation
4. **Message history** showing past generations
5. **Usage tracking** for free/paid users
6. **Multi-language support**

