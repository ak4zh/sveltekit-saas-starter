<script lang="ts">
    import { supabase} from "$lib/db";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { setServerSession } from "$lib/session";

    onMount(async () => {
        await supabase.auth.signOut();
        await setServerSession(null);
        goto('/login');
    })
</script>