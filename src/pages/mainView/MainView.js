import React from 'react'
import ListCategories from '../../component/ListCategories/ListCategories'

export default function MainView({categories}) {
 

  
    return (
        <>
<ListCategories categories={categories} />
        </>
    );
}
