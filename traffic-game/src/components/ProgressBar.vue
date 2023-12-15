<template>
  <div class="score-bar">
    <div class="gradient-bar">
      <div class="progress-bar" :style="{ width: `${score}%` }"></div>
      <div class="pin" :style="{ left: `${currentScore}%` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentScore: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      normalizedScore: this.normalizeScore(this.currentScore),
    };
  },
  watch: {
    currentScore(newValue) {
      // Update the normalized score and pin position when the external score changes
      this.normalizedScore = this.normalizeScore(newValue);
    },
  },
  methods: {
    normalizeScore(score) {
      // Normalize the score to a percentage between 0 and 100
      const maxScore = 100; // Set your desired maximum value
      return (score / maxScore) * 100;
    },
  },
};
</script>

<style scoped>
.score-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure it's above other elements */
}

.gradient-bar {
  height: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to left, #ff0000, #00ff00);
}

.progress-bar {
  height: 100%;
}

.pin {
  position: absolute;
  top: 0;
  width: 10px;
  height: 100%;
  background-color: #000;
  cursor: default; /* Disable cursor change */
  /* Optional: Add styles for better visibility */
}
</style>
