-- Clear all pending applications
DELETE FROM hostel_applications WHERE status = 'Pending';

-- Reset students who were in "Applied" status back to "Prospective"
UPDATE students 
SET enrollment_status = 'Prospective', hostel_block_id = NULL 
WHERE enrollment_status = 'Applied';

-- Show results
SELECT 'Applications cleared!' as message;
SELECT COUNT(*) as remaining_applications FROM hostel_applications;
