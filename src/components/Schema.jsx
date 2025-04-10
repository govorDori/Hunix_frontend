import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { generateSchema } from '../utility/generateFirebaseSchema'

const Schema = () => {
	const [schema, setSchema] = useState(null)
	const [collectionName, setCollectionName] = useState('Users')

	const handleSchema = () => {
		console.log('klikk volt');

		generateSchema(collectionName, setSchema)
	}
	console.log(schema);

	return (
		<div style={{ padding: '6rem', display:"flex", flexDirection:"column" }}>

			<button onClick={handleSchema}>show schema</button>

			{schema && Object.entries(schema).map(([key, value]) =>
				<div style={{display:"flex", flexWrap:"nowrap", textAlign:"center"}}>
					<ul style={{width:"50%"}}>
						<li style={{ border: "1px black solid", padding: "5px" }}>
							{key}
						</li>
					</ul>
					<ul style={{width:"50%"}}>
						<li style={{ border: "1px black solid", padding: "5px"}}>
							{value}
						</li>
					</ul>
				</div>

			)}


		</div>
	)
}

export default Schema
