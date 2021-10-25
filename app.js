function getRandomValue(min, max) {
    //rendom number between min and max
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            currentRound: 0,
            playerHealth: 100,
            monsterHealth: 100,
            winner: null,
            logs: []
        }
    },

    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: "0%" }
            }
            return { width: `${this.monsterHealth}%` }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: "0%" }
            }
            return { width: `${this.playerHealth}%` }
        },
        canUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw!";
            } else if (value <= 0) {
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw!"
            } else if (value <= 0) {
                this.winner = "player";
            }
        }
    },

    methods: {
        startGame() {
            this.currentRound = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.logs = [];
        },
        attackMonster() {
            this.currentRound++;
            const value = getRandomValue(5, 12);
            this.monsterHealth -= value
            this.logs.unshift("you attacked monster - " + value);
            this.attackPlayer();
        },
        attackPlayer() {
            const value = getRandomValue(8, 15);
            this.playerHealth -= value;
            this.logs.unshift("monster attacked you - " + value);
        },
        specialAttackMonster() {
            this.currentRound++;
            const value = getRandomValue(10, 25);
            this.monsterHealth -= value
            this.logs.unshift("special attack to monster - " + value);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const heal = getRandomValue(8, 20);
            if (this.playerHealth + heal > 100) this.playerHealth = 100;
            else this.playerHealth += heal;
            this.logs.unshift("heal for you - " + heal)
            this.attackPlayer();
        },
        surrender() {
            this.winner = "monster";
            this.logs.unshift("you surrendered")
        }
    }

});

app.mount("#game");
