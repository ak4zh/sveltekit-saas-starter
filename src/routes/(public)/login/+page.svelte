<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { supabase } from '$lib/db';
	import { setServerSession } from '$lib/session';
	import { goto } from '$app/navigation';
	import { PUBLIC_LOGIN_REDIRECT_PATH } from '$env/static/public'
	import { Alert, Button, Card, Tab, TabGroup } from '@brainandbones/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import toast, { Toaster } from 'svelte-french-toast';
	import { key as loaderKey } from '$lib/utils/loader'
	import { page } from '$app/stores';

	const authRedirectUrl = `${$page.url.origin}/login`
	const loading: Writable<Boolean> = getContext(loaderKey)
	let email: string = ''
	let password: string
	let repeatPassword: string

	let message: string
	let error: string
	let selected = writable('signIn')
	let magicURL = true
	$: isLogIn = $selected === 'signIn'
	
	onMount(async () => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			await setServerSession(session);
			if (event === "SIGNED_IN") {
				goto(PUBLIC_LOGIN_REDIRECT_PATH);
			}
		})
	})

	async function proceedwithToast() {
		toast.promise(
			signIn(),
			{
				loading: isLogIn ? 'Logging in...' : 'Creating your account...',
				success: isLogIn ? 'Login success.' : 'Account created.',
				error: 'Something went wrong.',
			}
		);
	}

	async function signIn() {
		loading.set(true)
		if (isLogIn) {
			const { user, session, error: authError } = await supabase.auth.signIn(
				{ email: email.toLowerCase(), password }, 
				{redirectTo: authRedirectUrl}
			);
			if (authError) {
				error = authError?.message
			} else if (!session) {
				message = 'Check your email for the confirmation link.'
			}
		} else {
			const { user, session, error: authError } = await supabase.auth.signUp(
				{ email: email.toLowerCase(), password },
				{redirectTo: authRedirectUrl}
			);
			if (authError) {
				error = authError?.message
			} else if (!session) {
				message = 'Check your email for the confirmation link.'
			}
		}
		loading.set(false)
		if (error) {
			throw Error(error)
		}
	}

	$: emailIsValid = email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
	$: formValid = $selected === 'signIn' ? emailIsValid && (password || magicURL) : emailIsValid && (magicURL || (password && repeatPassword && password === repeatPassword))
	function updateMessage(status: string) {
		message = ''
		error = ''
		magicURL = true
	}
	let loginButtonText = 'Send magic link'

	$: updateMessage($selected)
	$: {
		if (magicURL) {
			loginButtonText = 'Send magic link'
		} else {
			loginButtonText = isLogIn ? 'Log in' : 'Sign Up'
		}
	}
</script>

<Toaster />
<TabGroup {selected} class="flex justify-center mb-8">
	<Tab value="signIn">Login</Tab>
	<Tab value="signUp">Sign Up</Tab>
</TabGroup>

<Card class="hover:shadow-xl max-w-sm mx-auto" background="bg-surface-100 dark:bg-surface-800">
	{#if error}
		<Alert background="bg-warning-500/30" border="border-l-warning-500">
			<svelte:fragment slot="message">{error}</svelte:fragment>      
		</Alert>
	{/if}
	
	{#if message}
		<Alert>
			<svelte:fragment slot="message">{message}</svelte:fragment>      
		</Alert>
	{/if}
	<div class="flex flex-col gap-4">
		<label for="email">
			Email address
			<input bind:value={email} name="email" id="email" type="email" placeholder="Your email address" required/>
		</label>
		
		{#if !magicURL }
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
		{/if}
		<div class="flex justify-center gap-4">
			{#if magicURL && isLogIn}
				<Button on:click={() => magicURL = false} disabled={!formValid}>Log in by password </Button>
			{/if}
			<Button on:click={() => proceedwithToast()} variant="filled-primary" disabled={!formValid}>{loginButtonText}</Button>
		</div>
	</div>
</Card>
