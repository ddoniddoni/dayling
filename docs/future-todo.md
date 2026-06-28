# Future TODO

## Next Fixes

- Make hatched characters visually distinct in the 3D placeholder.
- Tune button colors so primary and secondary actions feel consistent across screens.
- Redesign the logout button so it fits the mobile header.
- Add a diary history screen or modal so users can view previous diary entries.

## Post-MVP Product Ideas

- Character evolution by level or diary streak.
- Inventory and collectible items.
- Shop and cosmetic rewards.
- Attendance rewards.
- Push notifications for diary and care reminders.
- Friend visits.
- Ads or rewarded ads after the core loop feels stable.

## Security Follow-Up

- Review Supabase public schema RLS policies before exposing any direct client database access.
- Keep Prisma server routes as the only database write path until RLS is designed and tested.
