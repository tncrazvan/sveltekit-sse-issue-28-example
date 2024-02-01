// src/routes/api/messages/+server.ts
import { events } from 'sveltekit-sse';
// import { pool } from '$lib/server/db.js';

// const updatedRows: string[] = [];

// const clientUpdate = await pool.connect();
// await clientUpdate.query('LISTEN transactions_update');

export function POST({ request }) {
	return events({
		request,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		start({ emit, lock }) {
			// if (!locals.authedUser) {
			// 	lock.set(false);
			// 	return function cancel() {
			// 		console.log('User not authorized.');
			// 	};
			// }

			const interval = setInterval(function run() {
				emit('message', `${Date.now()}`);
			}, 1000);

			const unsubscribe = lock.subscribe(function run($lock) {
				if ($lock) {
					return;
				}
				clearInterval(interval);
				unsubscribe();
			});

			// clientUpdate.on('notification', (notification) => {
			//     console.log('updated', notification);
			//     if (notification.payload){
			//             const { error } = emit('updated', updateRow);
			//             if (error) {
			//                 console.error('There is an error with sending the updated data', error);
			//                 return;
			//             }
			//         }
			// });

			return function cancel() {
				console.log('Stream canceled.');
			};
		}
	});
}
