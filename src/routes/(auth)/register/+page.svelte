<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { FloatingLabelInput, InputIconButton, Icon } from '$lib/components';
	export let form;
	const redirectTo = $page.url.searchParams.get('redirectTo') || '';
	let passwordShown = false;
    let confirmPasswordShown = false;
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form
			class="space-y-6"
			method="POST"
			use:enhance
		>

            {#if form?.errors?.server}
            <p class="block text-sm font-medium leading-6 text-red-700 dark:text-red-400">
                {form?.errors?.server}
            </p>
            {/if}
            <FloatingLabelInput
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				value={form?.data?.name ?? ''}
				placeholder="Name"
			/>
            {#if form?.errors?.name}
            <p class="block text-sm font-medium leading-6 text-red-700 dark:text-red-400">
                {form?.errors?.name[0]}
            </p>
            {/if}
			<FloatingLabelInput
				id="email"
				name="email"
				type="text"
				autocomplete="email"
				value={form?.data?.email ?? ''}
				placeholder="Email"
			/>
            {#if form?.errors?.email}
            <p class="block text-sm font-medium leading-6 text-red-700 dark:text-red-400">
                {form?.errors?.email[0]}
            </p>
            {/if}
			<FloatingLabelInput
				id="password"
				name="password"
				type={passwordShown == false ? 'password' : 'text'}
				placeholder="Password"
				autocomplete="off"
			>
				<InputIconButton on:click={() => (passwordShown = !passwordShown)}>
					<Icon icon="eye" hideOn={!passwordShown} strokeWidth={'1.5'} />
					<Icon icon="eye-slash" hideOn={passwordShown} strokeWidth={'1.5'} />
				</InputIconButton>
			</FloatingLabelInput>
            {#if form?.errors?.password}
            <p class="block text-sm font-medium leading-6 text-red-700 dark:text-red-400">
                {form?.errors?.password[0]}
            </p>
            {/if}
            <FloatingLabelInput
				id="confirm_password"
				name="confirm_password"
				type={confirmPasswordShown == false ? 'password' : 'text'}
				placeholder="Confirm password"
				autocomplete="off"
			>
				<InputIconButton on:click={() => (confirmPasswordShown = !confirmPasswordShown)}>
					<Icon icon="eye" hideOn={!confirmPasswordShown} strokeWidth={'1.5'} />
					<Icon icon="eye-slash" hideOn={confirmPasswordShown} strokeWidth={'1.5'} />
				</InputIconButton>
			</FloatingLabelInput>
            {#if form?.errors?.confirm_password}
            <p class="block text-sm font-medium leading-6 text-red-700 dark:text-red-400">
                {form?.errors?.confirm_password[0]}
            </p>
            {/if}

			<div>
				<button type="submit" class="flex w-full justify-center rounded-md bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-3 py-2 font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                    Create Account
                </button>
			</div>
            
			<div class="flex  w-full justify-between">
                <div class="text-xs">
                    <p class="font-medium">
                        Already have an account?
                    </p>
                </div>
				<div class="text-sm">
					<a href="/login" class="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-600">
                        Login
                    </a>
				</div>
			</div>
		</form>
	</div>
</div>
