<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user } = data);
	$: console.log($page)
</script>

<div class="block">
	<pre>Protected content for {user.email}</pre>
	<p>server-side fetched data with RLS:</p>
</div>
<div class="block">
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>