<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/db';
	import { setServerSession } from '$lib/session';
	import { goto } from '$app/navigation';
	import { PUBLIC_LOGIN_REDIRECT_PATH } from '$env/static/public'
	import { Alert, Button, Card } from '@brainandbones/skeleton';
	import { page } from '$app/stores';
	export let errors

	let sent = $page.url.searchParams.get('sent')
	let message = 'Check your email for the magic link.'

	onMount(async () => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			await setServerSession(session);
			if (event === "SIGNED_IN") {
				goto('/').then(() => {goto(PUBLIC_LOGIN_REDIRECT_PATH);})	;
			}
		})
	})
</script>
<Card class="hover:shadow-xl max-w-sm mx-auto" background="bg-surface-100 dark:bg-surface-800">
	<form class="flex flex-col gap-4" method="post">
		<label for="email">
			Email address
			<input name="email" id="email" type="email" placeholder="Your email address" required/>
		</label>
		<Button variant="filled-primary">Send magic link</Button>
		{#if errors}
			<Alert>
				<svelte:fragment slot="message">{errors.message}</svelte:fragment>      
			</Alert>	
		{:else if sent === 'true'}
			<p>{message}</p>		
		{/if}
	</form>
</Card>
