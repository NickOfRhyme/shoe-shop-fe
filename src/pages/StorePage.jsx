import { Link } from '@reach/router'
import React from 'react'

export default function StorePage() {
const itemIds = [1, 2, 3, 4, 5]

    return (
        <div>
            <p>Store Page</p>
            <ul>
            {itemIds.map ((itemId) => 
                <Link to={`/items/${itemId}`}>Let's take a look at item {itemId}</Link>
            )}
            </ul>
        </div>
    )
}
