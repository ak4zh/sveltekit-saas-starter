<script>
	import { fade } from 'svelte/transition'
    import { Jumper } from 'svelte-loading-spinners'
</script>

<div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center" transition:fade>
        Loading data...
        <Jumper size="60" color="#FF3E00" unit="px" duration="1s"></Jumper>
</div>
