SELECT avg(pr_rev.rating) AS average_rating, res.*, pr.* 
FROM reservations AS res
JOIN properties AS pr ON property_id = pr.id 
JOIN property_reviews AS pr_rev ON pr.id = pr_rev.property_id
WHERE end_date < now()::date AND res.guest_id = 1
GROUP BY res.guest_id, pr.title, start_date, res.id, pr.id
ORDER BY start_date
LIMIT 10;
