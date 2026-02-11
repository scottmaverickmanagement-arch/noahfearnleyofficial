-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the cron job
-- Runs every Monday at 9:00 AM
-- IMPORTANT: Replace 'YOUR_SERVICE_ROLE_KEY' with your actual Supabase Service Role Key
SELECT cron.schedule(
  'fetch-news-weekly',
  '0 9 * * 1',
  $$
    SELECT
      net.http_post(
          url:='https://jpolzhazmiwbbvqwkbxw.supabase.co/functions/v1/fetch-news',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
          body:='{}'::jsonb
      ) as request_id;
  $$
);
