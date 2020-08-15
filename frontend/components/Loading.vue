<template>
    <div>
        <div class="containerAnim">
            <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#E2007C"/>
                <circle cx="170" cy="170" r="135" stroke="#404041"/>
                <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
                <circle cx="170" cy="170" r="85" stroke="#404041"/>
            </svg>
        </div>
    <div class="charg">Chargement</div>
    </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped lang="scss">
.charg {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -320px;
    font-size: 40px;
    &:after{
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        animation: ellipsis steps(4,end) 2s infinite;
        content: "...";
        width: 0px;
        @keyframes ellipsis {
            to {
                width: 1em;    
            }
        }
    }
}

.containerAnim {
    margin-top: -250px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.loader {
    max-width: 15rem;
    width: 100%;
    height: auto;
    stroke-linecap: round;
}

circle {
    fill: none;
    stroke-width: 3.5;
    animation-name: preloader;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transform-origin: 170px 170px;
    will-change: transform;

    &:nth-of-type(1) {
        stroke-dasharray: 550px;
    }

    &:nth-of-type(2) {
        stroke-dasharray: 500px;
    }

    &:nth-of-type(3) {
        stroke-dasharray: 450px;
    }

    &:nth-of-type(4) {
        stroke-dasharray: 300px;
    }

    @for $i from 1 through 4 {
        &:nth-of-type(#{$i}) {
            animation-delay: -#{$i * 0.15}s;
        }
    }
}

@keyframes preloader {
    50% {
        transform: rotate(360deg);
    }
}
</style>