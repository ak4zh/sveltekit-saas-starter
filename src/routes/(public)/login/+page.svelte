<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { supabase } from '$lib/db';
	import { setServerSession } from '$lib/session';
	import { goto } from '$app/navigation';
	import { PUBLIC_LOGIN_REDIRECT_PATH } from '$env/static/public'
	import { Alert, Button, Card, Tab, TabGroup } from '@brainandbones/skeleton';
	import { writable, type Writable } from 'svelte/store';

	import { key as loaderKey } from '$lib/utils/loader'

	const loading: Writable<Boolean> = getContext(loaderKey)
	let email: string = ''
	let password: string
	let repeatPassword: string

	let message: string
	let error: string
	let selected = writable('signIn')

	async function signIn() {
		loading.set(true)
		try {
			if ($selected === 'signIn') {
				const { user, session, error: authError } = await supabase.auth.signIn({ email: email.toLowerCase(), password });
				if (authError) {
					message = authError?.message
				} else if (!session) {
					message = 'Check your email for the confirmation link.'
				}
			} else {
				const { user, session, error: authError } = await supabase.auth.signUp({ email: email.toLowerCase(), password });
				if (authError) {
					message = authError?.message
				} else if (!session) {
					message = 'Check your email for the confirmation link.'
				}
			}

		} catch {

		}
		loading.set(false)
	}

	onMount(async () => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			await setServerSession(session);
			if (event === "SIGNED_IN") {
				goto(PUBLIC_LOGIN_REDIRECT_PATH);
			}
		})
	})
	$: emailIsValid = email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
	$: formValid = $selected === 'signIn' ? emailIsValid && password : emailIsValid && password && repeatPassword && password === repeatPassword
	function updateMessage(status: string) {
		message = ''
		error = ''
	}

	$: updateMessage($selected)
</script>

<TabGroup {selected} class="flex justify-center mb-8">
	<Tab value="signIn">Login with existing account</Tab>
	<Tab value="signUp">Create a new account</Tab>
</TabGroup>

<Card class="hover:shadow-xl max-w-sm mx-auto" background="bg-surface-100 dark:bg-surface-800">
	<div class="flex flex-col gap-4">
		<label for="email">
			Email address
			<input bind:value={email} name="email" id="email" type="email" placeholder="Your email address" required/>
		</label>
		<label for="password">
			Password
			<input bind:value={password} name="email" id="password" type="password" placeholder="Password" required/>
		</label>
		{#if $selected === 'signUp'}
			<label for="password">
				Repeat Password
				<input bind:value={repeatPassword} name="email" id="email" type="password" placeholder="Password" required/>
			</label>	
		{/if}
		<Button on:click={() => signIn()} variant="filled-primary" disabled={!formValid}>{$selected === 'signIn' ? 'Log In' : 'Sign Up'}</Button>
		{#if error}
			<Alert>
				<svelte:fragment slot="message">{error}</svelte:fragment>      
			</Alert>	
		{:else if message}
			<p>{message}</p>		
		{/if}
	</div>
</Card>
