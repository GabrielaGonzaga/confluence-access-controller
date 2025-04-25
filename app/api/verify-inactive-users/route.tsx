// scripts/verify-inactive-users.ts

import { writeFileSync } from 'fs';
import { format } from 'date-fns';
import { lifecycleApi } from '@/lib/atlassian';
import { AtlassianUser } from '@/types/IAtlassianUser';

const ORG_ID = '541ae007-d73c-45f9-adfb-0331a737bd70';
const LOG_DIR = '/var/log/your-app';
const INACTIVITY_DAYS = 5;

async function fetchAllUsers() {
  let url: string | null = `/admin/v1/orgs/${ORG_ID}/users`;
  const allUsers: AtlassianUser[] = [];

  while (url) {
    const response = await lifecycleApi.get(url);
    const data = response.data;
    allUsers.push(...(data.data || []));
    url = data.links?.next ? new URL(data.links.next).pathname + new URL(data.links.next).search : null;
  }

  return allUsers;
}

async function verifyInactiveUsers() {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
  const logFile = `${LOG_DIR}/user-verification-${timestamp}.log`;
  
  try {
    const startTime = new Date();
    const logMessages: string[] = [];
    
    logMessages.push(`Starting user verification at ${startTime.toISOString()}`);

    // 1. Fetch all users
    const allUsers = await fetchAllUsers();
    logMessages.push(`Fetched ${allUsers.length} users`);

    // 2. Filter inactive users
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - INACTIVITY_DAYS);
    
    const inactiveUsers = allUsers.filter(user => {
      if (!user.last_active) return true;
      return new Date(user.last_active) < cutoffDate;
    });

    logMessages.push(`Found ${inactiveUsers.length} inactive users`);

    // 3. Disable inactive users
    const results = await Promise.allSettled(
      inactiveUsers.map(async user => {
        try {
          const disableUrl = `/users/${user.account_id}/manage/lifecycle/disable`;
          await lifecycleApi.post(disableUrl, {
            message: `Automatically disabled due to inactivity (no login in ${INACTIVITY_DAYS} days)`
          });
          return { success: true, account_id: user.account_id };
        } catch (error) {
          return { success: false, account_id: user.account_id, error: error.message };
        }
      })
    );

    // 4. Generate report
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.filter(r => r.status === 'fulfilled' && !r.value.success).length;

    logMessages.push(`Disabled ${successful} users successfully`);
    logMessages.push(`Failed to disable ${failed} users`);

    const endTime = new Date();
    const duration = (endTime.getTime() - startTime.getTime()) / 1000;
    
    logMessages.push(`Verification completed in ${duration} seconds`);
    logMessages.push(`Finished at ${endTime.toISOString()}`);

    // 5. Save log
    writeFileSync(logFile, logMessages.join('\n'));
    console.log(`Verification completed. Log saved to ${logFile}`);

  } catch (error) {
    const errorMessage = `Critical error: ${error.message}\n${error.stack}`;
    writeFileSync(logFile, errorMessage);
    console.error(errorMessage);
    process.exit(1);
  }
}

verifyInactiveUsers();