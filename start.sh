#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR" || exit

KEY_FILE=.webui_secret_key

PORT="${PORT:-8080}"
if test "$WEBUI_SECRET_KEY $WEBUI_JWT_SECRET_KEY" = " "; then
  echo "No WEBUI_SECRET_KEY provided"

  if ! [ -e "$KEY_FILE" ]; then
    echo "Generating WEBUI_SECRET_KEY"
    # Generate a random value to use as a WEBUI_SECRET_KEY in case the user didn't provide one.
    echo $(head -c 12 /dev/random | base64) > "$KEY_FILE"
  fi

  echo "Loading WEBUI_SECRET_KEY from $KEY_FILE"
  WEBUI_SECRET_KEY=$(cat "$KEY_FILE")
fi

if [ "$USE_OLLAMA_DOCKER" = "true" ]; then
    echo "USE_OLLAMA is set to true, starting ollama serve."
    ollama serve &
fi

if [ "$USE_CUDA_DOCKER" = "true" ]; then
  echo "CUDA is enabled, appending LD_LIBRARY_PATH to include torch/cudnn & cublas libraries."
  export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/lib/python3.11/site-packages/torch/lib:/usr/local/lib/python3.11/site-packages/nvidia/cudnn/lib"
fi

WEBUI_SECRET_KEY="$WEBUI_SECRET_KEY" exec uvicorn main:app --host 0.0.0.0 --port "$PORT" --forwarded-allow-ips '*'
