<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ profile } = data);
</script>

<div class="card">
    {JSON.stringify(profile)}
</div>

<div class="card max-w-3xl mx-auto">
    <form method="post" class="flex flex-col gap-2">
        <div class="field">
            <label for="full_name" class="label">Full Name</label>
            <p class="control">
                <input
                    id="full_name"
                    name="full_name"
                    class="input"
                    type="text"
                    value="{profile.full_name}"
                    required
                />
            </p>
        </div>
        <div class="field">
            <label for="username" class="label">Username</label>
            <p class="control">
                <input
                    id="username"
                    name="username"
                    class="input"
                    type="text"
                    value="{profile.username}"
                    required
                />
            </p>
        </div>
        <div class="mx-auto">
                <button class="btn btn-filled-primary">Save</button>
        </div>
    </form>
</div>
