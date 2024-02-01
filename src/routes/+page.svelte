<script lang="ts">
	import { source } from 'sveltekit-sse';
	const IS_BROWSER = typeof document !== 'undefined';

	const connection = source('/events', {
		close: (event) => IS_BROWSER && console.log('Connection closed', event),
		error: (event) => IS_BROWSER && console.error('Connection error', event)
	});

	const updatedMessagesString = connection.select('message');
</script>

date: {$updatedMessagesString}
