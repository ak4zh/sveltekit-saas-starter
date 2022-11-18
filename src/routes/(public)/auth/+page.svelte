<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading = false;
	$: isRegister = $page.url.searchParams.get('register') === ''

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<section class="columns max-w-xl mx-auto">
	<div class="column is-half is-offset-one-quarter card">	
		<h1>{isRegister ? 'Sign up' : 'Log In'}</h1>
		{#if form?.error}
			<div class="block notification is-danger">{form.error}</div>
		{/if}
		{#if form?.message}
			<div class="block notification is-primary">{form.message}</div>
		{/if}
		<form method="post" use:enhance={handleSubmit} action='?/{isRegister ? 'signup' : 'login'}' class="flex flex-col gap-2">
			{#if isRegister}
				<div class="field">
					<label for="full_name" class="label">Full Name</label>
					<p class="control">
						<input
							id="full_name"
							name="full_name"
							value={form?.values?.full_name ?? ''}
							class="input"
							type="text"
							placeholder="Full Name"
							required
						/>
					</p>
				</div>
			{/if}
			<div class="field">
				<label for="email" class="label">Email</label>
				<p class="control">
					<input
						id="email"
						name="email"
						value={form?.values?.email ?? ''}
						class="input"
						type="email"
						placeholder="Email"
						required
					/>
				</p>
			</div>
			<div class="field">
				<label for="password" class="label">Password</label>
				<p class="control">
					<input
						id="password"
						name="password"
						class="input"
						type="password"
						placeholder="Password"
						required
					/>
				</p>
			</div>
			<div class="mx-auto">
					<button disabled={loading} class="btn btn-filled-primary">{isRegister ? 'Sign up' : 'Log In'}</button>
			</div>
		</form>

		<div class="mt-6">
			<p class="has-text-centered">
				{#if isRegister}
					Already have an account? <a href="/auth">Login</a>	
				{:else}
					Don't have an account? <a href="/auth?register">Sign up</a>
				{/if}
			</p>
		</div>
	</div>
</section>