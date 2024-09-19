const queries = {

    c4d_categories_count: `SELECT ct.name as category, count(callfordata.id) as count
                         FROM categories ct left join c4d callfordata 
                         on ct.id = callfordata.category_id
                         group by ct.name
                         order by count desc 
                         OFFSET $1 LIMIT $2`,
    best_dataset_price: `SELECT us.username as user, COALESCE(SUM(dt.price))  as total_price
                         FROM users us  inner join datasets dt 
                         on dt.owner_id  = us.id 
                         group by us.username 
                         order by total_price desc 
                         OFFSET $1 LIMIT $2`,
    best_rewards: `SELECT us.username as user, COALESCE(SUM(callfordata.reward)) as total_rewards
                        FROM users us  inner join c4d callfordata
                        on callfordata.consumer_id  = us.id 
                        group by us.username 
                        order  by total_rewards desc 
                        OFFSET $1 LIMIT $2 `
}
module.exports = {
    queries
}